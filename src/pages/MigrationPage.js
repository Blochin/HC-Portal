import CustomFileUpload from "../components/FileUpload";
import api from "../utils/api";
import { Button, Tabs } from "flowbite-react";
import { TbArchive } from "react-icons/tb";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { toastOptions } from "../components/ToastOptions";

const MigrationPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const handleUploadCryptograms = (name, file) => {
    if (file == null) {
      return;
    }
    const formData = new FormData();
    formData.append(name, file);
    api
      .post("/api/cryptograms-migrate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() =>
        toast.success("Successfully uploaded Cryptogram dump", toastOptions),
      )
      .catch(() => toast.error("Cryptogram dump not loaded", toastOptions));
  };

  const handleUploadCipherKeys = (name, file) => {
    if (file == null) {
      return;
    }
    const formData = new FormData();
    formData.append(name, file);
    api
      .post("/api/cipher-keys-migrate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() =>
        toast.success("Successfully uploaded Cipher key dump", toastOptions),
      )
      .catch(() => toast.error("Cipher key dump not loaded", toastOptions));
  };

  const runWorker = () => {
    api
      .post("/api/configuration/exec-worker")
      .then(() => {
        toast.success("Worker started", toastOptions);
      })
      .catch(() => toast.error("Worker fail", toastOptions));
  };

  const killWorker = () => {
    api
      .post("/api/configuration/kill-worker")
      .then(() => {
        toast.success("Worker killed", toastOptions);
      })
      .catch(() => toast.error("Worker kill fail", toastOptions));
  };

  return (
    <div>
      <div className={"flex flex-col"}>
        <div className={"flex flex-row mb-4 justify-between"}>
          <h1>Migration</h1>
          <div className={"flex flex-row gap-2 justify-center items-center"}>
            <Button onClick={runWorker} color={"green"}>
              Run Worker
            </Button>
            <Button onClick={killWorker} color={"red"}>
              Kill Worker
            </Button>
          </div>
        </div>
        <Tabs
          color={"light"}
          aria-label="Default tabs"
          onActiveTabChange={(value) => setActiveTab(value)}
        >
          <Tabs.Item
            active={activeTab === 0}
            title="Cryptogram migration"
            icon={TbArchive}
          >
            <CustomFileUpload
              name={"file"}
              label={"Upload Cryptogram SQL dump"}
              onChange={(name, file) => handleUploadCryptograms(name, file)}
            />
          </Tabs.Item>
          <Tabs.Item
            active={activeTab === 1}
            title="Cipher keys migration"
            icon={TbArchive}
          >
            <CustomFileUpload
              name={"file"}
              label={"Upload Cipher Key SQL dump"}
              onChange={(name, file) => handleUploadCipherKeys(name, file)}
            />
          </Tabs.Item>
          <Tabs.Item
            active={activeTab === 2}
            title="Bulk upload"
            icon={TbArchive}
          >
            Coming soon
          </Tabs.Item>
        </Tabs>
      </div>
    </div>
  );
};

export default MigrationPage;
