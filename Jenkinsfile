/**
 * This pipeline will run a Docker image build
 */

podTemplate(label: 'docker',
  containers: [containerTemplate(name: 'docker', image: 'docker:1.11', ttyEnabled: true, command: 'cat')],
  volumes: [hostPathVolume(hostPath: '/var/run/docker.sock', mountPath: '/var/run/docker.sock')]
  ) {

  def image = "jenkins/jnlp-slave"
  node('docker') {
    stage('Build Docker image') {
      git 'https://github.com/xavierloup/guestbook'
      container('docker') {
        sh "docker build -t ${image} ."
      }
    }

    stage('Test') {
        sh "echo Success"
    }
  }
}
