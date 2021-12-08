FROM golang:1.16-alpine

WORKDIR /app

COPY . .

RUN go build -o sinar-arco-backend

EXPOSE 3000

CMD ./sinar-arco-backend