// import { downloadResumes } from "../util/download-functions";
import { Flex, Icon, Spinner, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import { useParams } from "react-router-dom";
// import { Resume } from "./ResumeBook";
import { api, path} from "../index";
// import { Config } from "../config";

export function DownloadPage() {
  const { resumeId } = useParams<{ resumeId: string }>();

  const toast = useToast();

  const [currentState, setCurrentState] = useState<
    "not-started" | "downloading" | "failed" | "success"
  >("not-started");

  const showToast = (message: string, status: "error" | "success") => {
    toast({
      title: message,
      status,
      duration: 9000,
      isClosable: true
    });
  };

  const handleDownloadResume = () => {
    setCurrentState("downloading");

    if (!resumeId) {
      showToast("No resume ID provided.", "error");
      return;
    }

    api.get(path("/resume/download/:userId", { userId: resumeId }))
    .then(function (response){
        const {url} = response.data as {url: string}
        window.location.replace(url);
    })
    .then(() => {
      showToast("Resume downloaded successfully!", "success");
      setCurrentState("success");
    })
    .catch(function (error) {
        showToast(
          `Error ${error}: Failed to fetch resumes - please sign in again`,
          "error"
        );
        setCurrentState("failed");
    });

    // api
    //   .get(path("/resume/download/:userId", { userId: resumeId }))
    //   .then(function (response) {
    //     let resumes = response.data.map(
    //       (registrant) =>
    //         ({
    //           email: registrant.email,
    //           id: registrant.userId,
    //           firstName: registrant.firstName,
    //           lastName: registrant.lastName,
    //           school: registrant.school,
    //           major: registrant.major,
    //           degree: registrant.education,
    //           graduationYear: registrant.graduate,
    //           // id: registrant.userId,
    //           // name: registrant.name,
    //           // majors: registrant.majors,
    //           // minors: registrant.minors,
    //           // degree: registrant.educationLevel,
    //           // graduationYear: registrant.graduationYear,
    //           // jobInterest: registrant.opportunities,
    //           // portfolios: registrant.personalLinks
    //         }) as Resume
    //     );

    //     const developerResumes: Resume[] = [];
    //     const allResumes: Resume[] = [];

    //     resumes.forEach((resume) => {
    //       if (Config.RESUMEBOOK_DEVELOPER_UIDS.includes(resume.id)) {
    //         developerResumes.push(resume);
    //       } else {
    //         allResumes.push(resume);
    //       }
    //     });

    //     developerResumes.sort((a, b) => {
    //       return (
    //         Config.RESUMEBOOK_DEVELOPER_UIDS.indexOf(a.id) -
    //         Config.RESUMEBOOK_DEVELOPER_UIDS.indexOf(b.id)
    //       );
    //     });

    //     resumes = [...developerResumes, ...allResumes];
    //     return resumes;
    //   })
    //   .then(function (resumes) {
    //     return downloadResumes(resumes, [resumeId]);
    //   })
    //   .then(() => {
    //     showToast("Resume downloaded successfully!", "success");
    //     setCurrentState("success");
    //   })
    //   .catch(function (error) {
    //     showToast(
    //       `Error ${error}: Failed to fetch resumes - please sign in again`,
    //       "error"
    //     );
    //     setCurrentState("failed");
    //   });
  };

  useEffect(() => {
    if (!resumeId) {
      console.error("No resume ID provided in URL parameters.");
      setCurrentState("failed");
      return;
    }
    console.log("DownloadPage mounted, starting download...");
    handleDownloadResume();
  }, [resumeId]);

  return (
    <Flex
      gap={3}
      p={3}
      alignItems={"center"}
      justifyContent={"center"}
      h="100vh"
    >
      {currentState === "downloading" && (
        <>
          <Spinner />
          <Text fontSize="xl">Downloading resume...</Text>
        </>
      )}
      {currentState === "failed" && (
        <>
          <Icon as={IoCloseCircle} boxSize={6} color="red.500" />
          <Text fontSize="xl" color="red.500">
            Failed to download resume. Please try again.
          </Text>
        </>
      )}
      {currentState === "success" && (
        <>
          <Icon as={FaCircleCheck} boxSize={6} color="green.500" />
          <Text fontSize="xl" color="green.500">
            Resume downloaded successfully.
          </Text>
        </>
      )}
    </Flex>
  );
}
