FROM python:3.10-slim

# Install OS dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    gfortran \
    libopenblas-dev \
    liblapack-dev \
    libx11-dev \
    libgtk-3-dev \
    libboost-all-dev \
    libssl-dev \
    libffi-dev \
    python3-dev \
    && apt-get clean

# Set working directory
WORKDIR /app

# Copy requirements and install Python deps
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy rest of the code
COPY . .

# Expose Flask port
EXPOSE 5000

# Start the server
CMD ["python", "server.py"]
