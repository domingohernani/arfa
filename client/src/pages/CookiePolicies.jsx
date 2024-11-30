import React, { useEffect, useState } from "react";
import { FooterSection } from "../components/navigation/FooterSection";
import SearchlessNavigationBar from "../components/SearchlessNavigationBar";
import { getDownloadURL, getMetadata, listAll, ref } from "firebase/storage";
import { storage } from "../firebase/firebase";
import Mammoth from "mammoth";

const CookiePolicies = () => {
  const [fileContent, setFileContent] = useState(""); // To store the HTML content
  const [fileDate, setFileDate] = useState(""); // To store the file's creation date
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMostRecentFile = async () => {
      try {
        // Reference to the folder in Firebase Storage
        const folderRef = ref(storage, "platform/cookiepolicy");

        // List all files in the folder
        const fileList = await listAll(folderRef);

        // Get metadata for each file to find the most recent one
        const filesWithMetadata = await Promise.all(
          fileList.items.map(async (fileRef) => {
            const metadata = await getMetadata(fileRef);
            return { ref: fileRef, timeCreated: metadata.timeCreated };
          })
        );

        // Sort files by creation time (most recent first)
        const sortedFiles = filesWithMetadata.sort(
          (a, b) => new Date(b.timeCreated) - new Date(a.timeCreated)
        );

        // Get the download URL of the most recent file
        if (sortedFiles.length > 0) {
          const mostRecentFileRef = sortedFiles[0].ref;
          const mostRecentFileUrl = await getDownloadURL(mostRecentFileRef);

          // Store the file's creation date
          const mostRecentFileDate = new Date(
            sortedFiles[0].timeCreated
          ).toLocaleDateString();
          setFileDate(mostRecentFileDate);

          // Fetch the file as an ArrayBuffer for Mammoth.js
          const response = await fetch(mostRecentFileUrl);
          const arrayBuffer = await response.arrayBuffer();

          // Convert the file content to HTML using Mammoth.js
          const { value } = await Mammoth.convertToHtml({ arrayBuffer });
          setFileContent(value); // Store the converted HTML content
        } else {
          console.error("No files found in the folder.");
        }
      } catch (error) {
        console.error("Error fetching cookie policy:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMostRecentFile();
  }, []);

  return (
    <section>
      <section className="mx-6 my-3">
        <SearchlessNavigationBar />
      </section>
      <section className="w-4/5 max-w-5xl mx-auto">
        {loading ? (
          <p>Loading cookie policies...</p>
        ) : fileContent ? (
          <>
            <p className="mb-4 text-sm text-gray-800">
              Last updated: <strong>{fileDate}</strong>
            </p>
            <div
              dangerouslySetInnerHTML={{ __html: fileContent }}
              className="cookie-policy-content"
            ></div>
          </>
        ) : (
          <p>No cookie policies available.</p>
        )}
      </section>
      <section>
        <FooterSection />
      </section>
    </section>
  );
};

export default CookiePolicies;
