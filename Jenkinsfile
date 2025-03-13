pipeline {
    agent any

    environment {
        NO_COLOR = '1' // Desativa a cor no Cypress para evitar problemas na saída do terminal
    }

    stages {
        stage('Clonar Repositório') {
            steps {
                git branch: 'main', url: 'https://github.com/eulucasilva/tcc-ebac.git'
            }
        }

        stage('Instalar Dependências') {
            steps {
                sh 'npm install'
            }
        }

        stage('Executar Testes de API') {
            steps {
                script {
                    sh "npx cypress run --headless --spec 'cypress/e2e/API/cupons.cy.js'"
                }
            }
        }

        stage('Executar Testes Web') {
            steps {
                script {
                    sh "npx cypress run --headless --spec 'cypress/e2e/UI/adicionar_itens_Carrinho.cy.js'"
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/cypress/screenshots/**, **/cypress/videos/**, **/*.log', allowEmptyArchive: true
        }
    }
}
