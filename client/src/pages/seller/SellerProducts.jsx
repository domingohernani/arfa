import React, { useState, useEffect } from "react";
import { storage } from "../../firebase/firebase";
import {
  ref,
  uploadBytesResumable,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import ShowModel from "../../components/ShowModel";

const SellerProducts = () => {
  const [model, setModel] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const upload = () => {
    if (model) {
      setUploading(true);
      const storageRef = ref(storage, `models/${model.name}`);
      const uploadTask = uploadBytesResumable(storageRef, model);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(value);
        },
        (error) => {
          console.error(error);
          setUploading(false);
          setProgress(0);
        },
        () => {
          setUploading(false);
          setProgress(100);
          alert("File uploaded successfully");
          fetchFiles(); // Fetch files after upload is complete
        }
      );
    } else {
      alert("No selected model");
    }
  };

  const inputFileOnChange = (e) => {
    if (e.target.files[0]) {
      setModel(e.target.files[0]);
    }
  };

  const fetchFiles = async () => {
    setLoading(true);
    const listRef = ref(storage, "models/");
    try {
      const res = await listAll(listRef);
      const fileUrls = await Promise.all(
        res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { name: itemRef.name, url };
        })
      );
      setFiles(fileUrls);
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div>
      <input type="file" onChange={inputFileOnChange} />
      <button className="px-3 py-2 bg-arfagreen" onClick={upload}>
        Upload
      </button>

      {uploading && <span>Uploading {progress.toFixed(2)}%</span>}

      <button onClick={fetchFiles}>View Files</button>

      {loading ? (
        <p>Loading files...</p>
      ) : (
        <div>
          {files.map((file) => (
            <div
              key={file.name}
              className="h-56 rounded-none md:rounded-lg md:h-64 2xl:h-90 bg-arfagray"
            >
              <ShowModel path={file.url} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerProducts;
