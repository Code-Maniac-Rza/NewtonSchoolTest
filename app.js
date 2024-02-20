const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let jobListings = [];
let jobApplications = {};

app.post('/api/v1/jobs', (req, res) => {
    const { title, company, location, description } = req.body;
    const newJobListing = {
        id: jobListings.length + 1,
        title,
        company,
        location,
        description
    };
    jobListings.push(newJobListing);
    res.status(201).json(newJobListing);
});

app.get('/api/v1/jobs', (req, res) => {
    res.status(200).json(jobListings);
});

app.post('/api/v1/apply/:jobID', (req, res) => {
    const jobID = req.params.jobID;
    const { applicantName, applicantEmail, coverLetter } = req.body;
    const newJobApplication = {
        applicantName,
        applicantEmail,
        coverLetter
    };
    if (!jobApplications[jobID]) {
        jobApplications[jobID] = [];
    }
    jobApplications[jobID].push(newJobApplication);
    res.status(201).json(newJobApplication);
});

app.get('/api/v1/jobs/:jobId/applications', (req, res) => {
    const jobID = req.params.jobId;
    const applications = jobApplications[jobID] || [];
    res.status(200).json(applications);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
