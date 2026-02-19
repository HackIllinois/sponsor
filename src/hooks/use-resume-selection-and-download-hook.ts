import { Config } from "../config";
import { Resume } from "../routes/ResumeBook";
import { downloadResumes, downloadAllResumesHandler } from "../util/download-functions";
import { saveAs } from "file-saver";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

export function useResumeSelectionAndDownloadHook({
  allFilteredResumes,
  filteredResumes,
  allResumes
}: {
  allFilteredResumes: Resume[];
  filteredResumes: Resume[];
  allResumes: Resume[];
}) {
  const [selectedResumes, setSelectedResumes] = useState<string[]>([]);
  const toast = useToast();

  const resetSelectedResumes = () => {
    setSelectedResumes([]);
  };

  const csvEscape = (value: unknown) => {
  const s = String(value ?? "");
  if (/[",\n]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
};

  const toggleResume = (id: string) => {
    setSelectedResumes((prev) =>
      prev.includes(id)
        ? prev.filter((resumeId) => resumeId !== id)
        : [...prev, id]
    );
  };

  const selectAllResumes = () => {
    if (selectedResumes.length === filteredResumes.length) {
      setSelectedResumes([]);
    } else {
      setSelectedResumes(filteredResumes.map((resume) => resume.id));
    }
  };

  const handleDownloadResumes = async () => {
    await downloadResumes(filteredResumes, selectedResumes);
  };

  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);

//   const downloadAllResumes = async () => {
//     const allIds = allResumes.map(r => r.id);
//   await downloadAllResumesHandler(allResumes, allIds);
// };

const downloadAllResumes = async () => {
  setIsDownloading(true);
  setProgress(0);
  const allIds = allResumes.map(r => r.id);
  setTotal(allIds.length);

  const {succeeded, failed} = await downloadAllResumesHandler(
    allResumes,
    allIds,
    (completed) => {
      setProgress(completed);
    }
  );

  toast({
  title: "Resume download finished",
  description: `${succeeded} succeeded, ${failed} failed`,
  status: failed > 0 ? "warning" : "success",
  duration: 5000,
  isClosable: true
});

  setIsDownloading(false);
};

  const downloadResumesCSV = (selected: boolean = false) => {
    const csvContent = [
      "First Name,Last Name,Major,Degree,Graduation Year,Resume Link"
    ]
      .concat(
        allFilteredResumes
          .filter((resume) => {
            if (selected) {
              return selectedResumes.includes(resume.id);
            }
            return true;
          })
          .map((resume) => {
            // const portfolios = resume.portfolios
            //   ? resume.portfolios.join("; ")
            //   : "";

            const row = [
              // resume.name,
              resume.firstName,
              resume.lastName,
              // resume.majors.join("; ") || "",
              resume.major,
              // resume.minors.join("; ") || "",
              resume.degree || "",
              resume.graduationYear || "",
              // resume.jobInterest.join("; "),
              // portfolios,
              `${Config.RESUME_BOOK_URL}/resume-book/download/${resume.id}`
            ].map(csvEscape);

            return row.join(",");


          
            // return [
            //   // resume.name,
            //   resume.firstName,
            //   resume.lastName,
            //   // resume.majors.join("; ") || "",
            //   resume.major,
            //   // resume.minors.join("; ") || "",
            //   resume.degree || "",
            //   resume.graduationYear || "",
            //   // resume.jobInterest.join("; "),
            //   // portfolios,
            //   `${Config.RESUME_BOOK_URL}/resume-book/${resume.id}/download`
            // ].join(",");
          })
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "resumes.csv");
  };
  return {
    selectedResumes,
    toggleResume,
    selectAllResumes,
    handleDownloadResumes,
    downloadResumesCSV,
    resetSelectedResumes,
    downloadAllResumes,
    isDownloading,
    progress,
    total
  };
}
