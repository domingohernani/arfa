import { FooterSection } from "../components/navigation/FooterSection";
import logo from "../assets/logos/logo_black.svg";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import profile from "../assets/icons/profile-black.svg";
import search from "../assets/icons/search.svg";
import heart from "../assets/icons/heart-black.svg";
import { NotificationDrawer } from "../components/dynamic/NotificationDrawer";
import SearchlessNavigationBar from "../components/SearchlessNavigationBar";
import { getDownloadURL, getMetadata, listAll, ref } from "firebase/storage";
import { db, storage } from "../firebase/firebase";
import Mammoth from "mammoth";

const TermsAndCondition = () => {
  const [fileContent, setFileContent] = useState(""); // To store the HTML content
  const [fileDate, setFileDate] = useState(""); // To store the file's creation date
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMostRecentFile = async () => {
      try {
        // Reference to the folder in Firebase Storage
        const folderRef = ref(storage, "platform/termsandconditions");

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
        console.error("Error fetching terms and conditions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMostRecentFile();
  }, []);

  return (
    <div className="text-gray-800 ">
      <section className="mx-6 my-3">
        <SearchlessNavigationBar />
      </section>
      <section className="w-4/5 max-w-5xl mx-auto">
        {loading ? (
          <p>Loading terms and conditions...</p>
        ) : fileContent ? (
          <>
            <p className="mb-4 text-sm text-gray-800">
              Last updated: <strong>{fileDate}</strong>
            </p>
            <div
              dangerouslySetInnerHTML={{ __html: fileContent }}
              className="terms-content"
            ></div>
          </>
        ) : (
          <p>No terms and conditions available.</p>
        )}
      </section>

      <section>
        <FooterSection />
      </section>
    </div>
  );
};

export default TermsAndCondition;
