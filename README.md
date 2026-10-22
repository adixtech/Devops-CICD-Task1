# DevOps Internship Task 1 --- CI/CD Pipeline with GitHub Actions

## Project Overview

This project demonstrates a basic Continuous Integration and Continuous
Delivery (CI/CD) pipeline for a small Node.js web application. GitHub
Actions automatically tests the application, builds a Docker image, and
pushes the image to Docker Hub when code is pushed to the `main` branch.

> **Important:** This project builds and publishes a Docker image. It
> does not deploy the application to a live server or hosting platform.

## Objectives

-   Create a simple Node.js HTTP application.
-   Write an automated test for the application.
-   Use GitHub Actions to run the test automatically.
-   Build a Docker image for the application.
-   Push the image to Docker Hub automatically.
-   Store Docker Hub credentials securely using GitHub repository
    secrets.

## Tools and Technologies

-   **Node.js** --- runs the JavaScript application.
-   **Node.js built-in test runner** --- checks the application's HTTP
    response.
-   **Git and GitHub** --- track and host the source code.
-   **GitHub Actions** --- runs the automated workflow.
-   **Docker** --- packages the application into an image.
-   **Docker Hub** --- stores the published Docker image.

## How the Pipeline Works

1.  A developer pushes code to the `main` branch, or manually starts the
    workflow.
2.  GitHub Actions checks out the repository code.
3.  The workflow sets up Node.js 22 and runs `npm test`.
4.  If the test job passes, the next job logs in to Docker Hub using
    GitHub Secrets.
5.  Docker builds an image using the `Dockerfile`.
6.  The image is pushed to Docker Hub with two tags:
    -   `latest`
    -   The Git commit SHA, which identifies the exact source revision.
7.  The workflow reports the result in the GitHub Actions tab.

The Docker build-and-push job depends on the test job, so it should not
run if the tests fail.

## Project Structure

``` text
Devops-CICD-Task1/
├── .github/
│   └── workflows/
│       └── main.yaml
├── app.js
├── app.test.js
├── Dockerfile
├── package.json
└── README.md
```

## Run the Application Locally

Requirements: Node.js 22 or a compatible recent Node.js release, plus
npm.

1.  Open a terminal in the project folder.

2.  Start the application:

    ``` bash
    npm start
    ```

3.  Open `http://localhost:3000` in a browser. The expected response is:

    ``` text
    Hello! My DevOps CI/CD pipeline is working.
    ```

4.  Stop the application with `Ctrl+C`.

## Run the Test

In the project folder, run:

``` bash
npm test
```

The test starts the server on a temporary local port, sends an HTTP
request, and checks that the status is `200` and the response text is
correct.

## Build and Run with Docker Manually

If Docker Desktop is installed and running, run these commands from the
project folder:

``` bash
docker build -t devops-cicd-task1 .
docker run --rm -p 3000:3000 devops-cicd-task1
```

Then open `http://localhost:3000`. Stop the container with `Ctrl+C`.

## GitHub Secrets Required

In the GitHub repository, go to **Settings → Secrets and variables →
Actions** and add:

  -----------------------------------------------------------------------
  Secret name                         Value
  ----------------------------------- -----------------------------------
  `DOCKERHUB_USERNAME`                Your Docker Hub username

  `DOCKERHUB_TOKEN`                   A Docker Hub personal access token
                                      with Read & Write permission
  -----------------------------------------------------------------------

Never put the token directly in the workflow file, application code, or
README. Do not commit secrets to GitHub.

## Verify the Results

1.  In GitHub, open the repository's **Actions** tab.
2.  Open the latest `Node.js CI/CD Pipeline` run.
3.  Confirm that **Test Application** and **Build and Push Docker
    Image** both complete successfully.
4.  Sign in to Docker Hub and open the `devops-cicd-task1` repository
    under the account used by `DOCKERHUB_USERNAME`.
5.  Open **Tags** and check for `latest` and a commit-SHA tag.

## Limitations and Possible Improvements

This is a learning project. It publishes a Docker image but does not
deploy it to a running server. Possible future improvements include:

-   Add more application tests.
-   Pin GitHub Actions to verified, Node.js 24-compatible versions to
    address deprecation warnings.
-   Add image scanning and dependency checks.
-   Deploy the image to a test server or cloud service.
-   Add a health check and monitoring.

## What I Learned

-   How a basic CI/CD workflow is triggered by a Git push.
-   How automated tests can act as a quality gate before image
    publishing.
-   How Docker packages an application into an image.
-   How GitHub Secrets keep deployment credentials out of source code.
-   How GitHub Actions and Docker Hub work together to automate image
    publishing.

------------------------------------------------------------------------

**Repository:** https://github.com/adixtech/Devops-CICD-Task1

Before submitting, confirm that the README accurately reflects the final
workflow status and that the Docker Hub image tags are visible.
