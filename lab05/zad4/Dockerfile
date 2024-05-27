ARG PYTHON_VERSION=3.9
ARG APP_PORT=8000

FROM python:${PYTHON_VERSION}-alpine

ENV PYTHON_VERSION=${PYTHON_VERSION}
ENV APP_PORT=${APP_PORT}

COPY app /app
WORKDIR /app

VOLUME /app/data
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE ${APP_PORT}

CMD ["python", "app.py"]

