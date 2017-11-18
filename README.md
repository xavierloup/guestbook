# A Guestbook Demo
A demo guestbook application written in NodeJS and working with a Cloudant database.
This demo has been written to demonstrate Kubernetes high-availability and Cloudant multi-master management.

## Usage
  - Fork the Repository, give it a new name
  - Copy the URL from your newly cloned repository
```sh
git clone <url to repository>
cd <repository name>
```

  - Create a cloudant database (can be done in IBM Bluemix using free quotas) and get its URL
  - Copy the /server/config-sample.json to /server/config.json
  - In config.json, enter the url of your Cloudant database  
  - From the terminal:

```sh
npm install
nodemon
```

# Running in docker
```sh
docker build -t guestbook .
docker run -p 3001:3001  --env="CLUSTER=NO" --env="CLOUDANT_URL=https://mycloudanturl" guestbook
```

# Running in kubernetes with Helm
- Copy the /guestbook/values-sample.yaml to /guestbook/values.yaml
- Configure the parameters in values.yaml  

```sh
helm install guestbook
```
