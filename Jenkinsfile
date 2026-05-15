pipeline {
    agent any

    environment {
        DOCKER_REPO = "karansbisht/financedashboard"
        TAG = "${BUILD_NUMBER}"
        DOCKER_CREDS = "docker-hub-login"
        CONTAINER_NAME = "financedashboard"
    }

    stages {

        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Karan-Singh-Bisht/FinanceDashboard'
            }
        }

        stage('Debug') {
            steps {
                sh 'git branch -a'
                sh 'git log -1 --oneline'
            }
        }

        stage('Build Image') {
            steps {
                script {
                    dockerImage = docker.build("${DOCKER_REPO}:${TAG}")
                }
            }
        }

        stage('Push Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDS) {
                        dockerImage.push()
                        dockerImage.push("latest")
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                sh """
                docker stop ${CONTAINER_NAME} || true
                docker rm ${CONTAINER_NAME} || true

                docker run -d \
                  --name ${CONTAINER_NAME} \
                  -p 80:80 \
                  ${DOCKER_REPO}:${TAG}
                """
            }
        }
    }
}