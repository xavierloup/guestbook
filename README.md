# A Guestbook Demo
A demo guestbook application written in NodeJS and working with a Cloudant database.
This demo has been written to demonstrate Kubernetes high-availability and Cloudant multi-master management.

## Usage
  - Fork the Repository, give it a new name
  - Copy the URL from your newly cloned repository
  - From the terminal:

```sh
git clone <url to repository>
cd <repository name>
npm install
nodemon
```

# Running in docker
```sh
docker build -t guestbook .
docker run -p 3001:3001  --env="CLUSTER=NO" --env="CLOUDANT_URL=https://mycloudanturl" guestbook
```
