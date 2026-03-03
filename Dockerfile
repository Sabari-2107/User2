FROM nginx:alpine

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy YOUR website files into nginx folder
COPY . "F:\MyWebsite\User2\Login.html"

EXPOSE 80
