import ResumeParser from "easy-resume-parser";

export default function handler(req, res) {
  //   console.log(req.body);
  const resume = new ResumeParser(req.body);
  resume
    .parseToJSON()
    .then((data) => {
      console.log("Yay! ", data);
      res.status(200).json({ data });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ error });
    });
}
