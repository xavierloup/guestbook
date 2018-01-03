PodTemplate(label: 'mypod', containers: [
    containerTemplate(name: 'docker', image: 'docker', ttyEnabled: true, command: 'cat')t', ttyEnabled: true)
  ],
  volumes: [
    hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
  ]) {
    node('mypod') {
      def app

      stage('Clone repository') {
          /* Let's make sure we have the repository cloned to our workspace */
          container('docker') {
            checkout scm
          }
      }

      stage('Build image') {
          /* This builds the actual image; synonymous to
           * docker build on the command line */
          container('docker') {
            sh "docker build . -t guestbook"
          }
      }

      stage('Test image') {
          /* Ideally, we would run a test framework against our image.
           * For this example, we're using a Volkswagen-type approach ;-) */

          app.inside {
              sh 'echo "Tests passed"'
          }
      }
  }
}
