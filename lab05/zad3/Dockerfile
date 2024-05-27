ARG PYTHON_VERSION

FROM python:${PYTHON_VERSION}

COPY myapp /app
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "app.py"]
