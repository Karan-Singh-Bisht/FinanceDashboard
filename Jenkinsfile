pipeline {
    agent any

    environment {
        DOCKER_REPO = "karansbisht/financedashboard"
        TAG = "${BUILD_NUMBER}"

        DOCKER_CREDS = "docker-hub-login"

        CONTAINER_NAME = "financedashboard"
    }

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/Karan-Singh-Bisht/FinanceDashboard'
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
                    docker.withRegistry('https://registry.hub.docker.com', DOCKER_CREDS) {
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