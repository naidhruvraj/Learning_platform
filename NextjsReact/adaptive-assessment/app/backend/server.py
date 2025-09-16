

# import os
# import pymongo
# import requests
# import whisper
# import subprocess
# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# from dotenv import load_dotenv
# import google.generativeai as genai
# from bson import ObjectId
# import json
# from fastapi.middleware.cors import CORSMiddleware

# # ✅ Load environment variables
# load_dotenv()
# MONGO_URI = os.getenv("MONGODB_URI")
# GEMINI_API_KEY = os.getenv("GOOGLE_API_KEY")

# # ✅ Initialize FastAPI app
# app = FastAPI()

# # ✅ Enable CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  
#     allow_credentials=True,
#     allow_methods=["*"],  
#     allow_headers=["*"],  
# )

# # ✅ Connect to MongoDB
# print("🔗 Connecting to MongoDB...")
# client = pymongo.MongoClient(MONGO_URI)
# db = client["storage"]
# students_collection = db["students"]
# modules_collection = db["modules"]
# print("✅ MongoDB connection successful.")

# # ✅ Load Whisper Model
# print("🔍 Loading Whisper model...")
# whisper_model = whisper.load_model("base")
# print("✅ Whisper model loaded successfully.")

# # ✅ Configure Gemini API
# genai.configure(api_key=GEMINI_API_KEY)
# print("✅ Gemini API configured.")

# # ✅ Define Gemini model configuration
# generation_config = {
#     "temperature": 0.7,
#     "top_p": 0.9,
#     "max_output_tokens": 1000,
#     "response_mime_type": "application/json",
# }

# model = genai.GenerativeModel(
#     model_name="gemini-1.5-flash",
#     generation_config=generation_config,
# )
# print("✅ Gemini model initialized.")

# # ✅ Pydantic Model for Request Data
# class AssessmentRequest(BaseModel):
#     student_email: str
#     module_id: str

# # ✅ Extract text from video
# def extract_text_from_video(video_url):
#     try:
#         print(f"📥 Downloading video from: {video_url}")
#         response = requests.get(video_url, stream=True)
#         if response.status_code != 200:
#             raise HTTPException(status_code=400, detail="Failed to download video")

#         # Save video temporarily
#         temp_video_path = "temp_video.mp4"
#         with open(temp_video_path, "wb") as f:
#             f.write(response.content)

#         # Extract audio using FFmpeg
#         temp_audio_path = "temp_audio.wav"
#         subprocess.run(
#             ["ffmpeg", "-i", temp_video_path, "-vn", "-acodec", "pcm_s16le", "-ar", "16000", "-ac", "1", temp_audio_path],
#             check=True
#         )

#         # Transcribe audio using Whisper
#         result = whisper_model.transcribe(temp_audio_path)
#         transcribed_text = result.get("text", "").strip()
#         if not transcribed_text:
#             raise ValueError("Whisper returned empty transcription.")

#         return transcribed_text

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error processing video: {str(e)}")

#     finally:
#         # Ensure cleanup
#         if os.path.exists(temp_video_path):
#             os.remove(temp_video_path)
#         if os.path.exists(temp_audio_path):
#             os.remove(temp_audio_path)

# # ✅ Generate questions based on difficulty level
# def generate_questions(extracted_text, student_category, num_questions=15):
#     difficulty_mapping = {
#         "Mild": "challenging questions with in-depth analysis",
#         "Moderate": "moderate difficulty questions covering essential concepts",
#         "Severe": "basic, simple, and easy-to-understand questions"
#     }

#     difficulty = difficulty_mapping.get(student_category, "Moderate")

#     prompt = f"""
#     Generate {num_questions} questions based on the following content.
#     The questions should be {difficulty}.
#     Include:
#     - Multiple-choice questions (MCQs) with four options
#     - Fill in the blanks
#     - True or false questions
#     - Multiple select questions (MSQs)

#     Each question should clearly indicate the correct answer.

#     Content:
#     {extracted_text}

#     Return output in JSON format:
#     {{
#         "questions": [
#             {{"type": "mcq", "question": "What is XYZ?", "options": ["A", "B", "C", "D"], "answer": "A"}},
#             {{"type": "fill_in_the_blank", "question": "The capital of France is ___.", "answer": "Paris"}},
#             {{"type": "true_false", "question": "The sun rises in the west.", "answer": "False"}},
#             {{"type": "msq", "question": "Select the prime numbers:", "options": ["2", "3", "4", "5"], "answer": ["2", "3", "5"]}}
#         ]
#     }}
#     """

#     response = model.generate_content(prompt)
#     try:
#         return json.loads(response.candidates[0].content)
#     except (json.JSONDecodeError, AttributeError):
#         raise HTTPException(status_code=500, detail="Gemini API returned invalid JSON")

# # ✅ Generate Assessment with Category-Based Difficulty
# @app.post("/generate_assessment")
# async def generate_assessment(data: AssessmentRequest):
#     try:
#         print(f"📩 Processing assessment for {data.student_email} on module {data.module_id}")

#         # Validate ObjectId format
#         try:
#             module_id = ObjectId(data.module_id)
#         except:
#             raise HTTPException(status_code=400, detail="Invalid module ID format")

#         # Fetch student details
#         student = students_collection.find_one({"email": data.student_email})
#         if not student:
#             raise HTTPException(status_code=404, detail="Student not found")

#         student_category = student.get("category", "Moderate")

#         # Fetch module from MongoDB
#         module = modules_collection.find_one({"_id": module_id})
#         if not module:
#             raise HTTPException(status_code=404, detail="Module not found")

#         video_url = module.get("videoUrl")
#         if not video_url:
#             raise HTTPException(status_code=400, detail="Module does not have a video URL")

#         # Extract text and generate questions
#         extracted_text = extract_text_from_video(video_url)
#         questions = generate_questions(extracted_text, student_category)

#         return {"questions": questions}

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# app/backend/server.py

import os
import pymongo
import requests
import whisper
import subprocess
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai
from bson import ObjectId
import json
from fastapi.middleware.cors import CORSMiddleware
import time

# ✅ Load environment variables
load_dotenv()
MONGO_URI = os.getenv("MONGODB_URI")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# ✅ Initialize FastAPI app
app = FastAPI()

# ✅ Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# ✅ Connect to MongoDB
print("🔗 Connecting to MongoDB...")
client = pymongo.MongoClient(MONGO_URI)
db = client["storage"]
students_collection = db["students"]
modules_collection = db["modules"]
print("✅ MongoDB connection successful.")

# ✅ Configure Gemini API
genai.configure(api_key=GOOGLE_API_KEY)
print("✅ Gemini API configured.")

# ✅ Define Gemini model configuration for Post-Assessment
generation_config_post = {
    "temperature": 0.7,
    "top_p": 0.9,
    "max_output_tokens": 1000,
    "response_mime_type": "application/json",
}

model_post = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config_post,
)
print("✅ Post-Assessment Gemini model initialized.")

# ✅ Define Gemini model configuration for Pre-Assessment
generation_config_pre = {
    "temperature": 0.9,
    "top_p": 1,
    "top_k": 40,
    "max_output_tokens": 2048,
    "response_mime_type": "application/json",
}

model_pre = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config_pre,
)
print("✅ Pre-Assessment Gemini model initialized.")


# ✅ Pydantic Model for Request Data
class AssessmentRequest(BaseModel):
    student_email: str
    module_id: str


# ** --- PRE-ASSESSMENT ENDPOINT --- **
preassessment_cache = {
    "data": None,
    "timestamp": 0,
    "ttl": 300  # Time-to-live in seconds (5 minutes)
}

@app.get("/api/preassessment")
async def get_preassessment_questions():
    """
    Generates pre-assessment questions using Gemini and an in-memory cache.
    """
    current_time = time.time()
    
    # Serve from cache if valid
    if preassessment_cache["data"] and (current_time - preassessment_cache["timestamp"] < preassessment_cache["ttl"]):
        print("Serving pre-assessment questions from cache.")
        return preassessment_cache["data"]

    prompt = """
Generate me 10 **unique** multiple-choice questions (MCQs) related to moderate-level mathematics and logical IQ. 
Each run should produce completely different questions with varied topics, structures, and numbers. 
Include a mix of patterns, logic, arithmetic puzzles, etc.

Strictly respond in this JSON format only:
[
  {
    "id": 1,
    "question": "Sample question?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Option A"
  }
]
Only provide a valid JSON array. No explanations.
"""
    try:
        response = model_pre.generate_content(prompt)
        output_text = response.candidates[0].content.parts[0].text.strip()
        questions_json = json.loads(output_text)

        preassessment_cache["data"] = {"questions": questions_json}
        preassessment_cache["timestamp"] = current_time

        return {"questions": questions_json}

    except Exception as e:
        print(f"Error generating pre-assessment questions: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate pre-assessment questions.")


# ** --- POST-ASSESSMENT ENDPOINT --- **
# ✅ Whisper model
whisper_model = whisper.load_model("base")

def extract_text_from_video(video_url):
    try:
        print(f"📥 Downloading video from: {video_url}")
        response = requests.get(video_url, stream=True)
        if response.status_code != 200:
            raise HTTPException(status_code=400, detail="Failed to download video")

        temp_video_path = "temp_video.mp4"
        with open(temp_video_path, "wb") as f:
            f.write(response.content)

        temp_audio_path = "temp_audio.wav"
        subprocess.run(
            ["ffmpeg", "-i", temp_video_path, "-vn", "-acodec", "pcm_s16le", "-ar", "16000", "-ac", "1", temp_audio_path],
            check=True
        )

        result = whisper_model.transcribe(temp_audio_path)
        transcribed_text = result.get("text", "").strip()
        if not transcribed_text:
            raise ValueError("Whisper returned empty transcription.")

        return transcribed_text

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing video: {str(e)}")

    finally:
        if os.path.exists("temp_video.mp4"):
            os.remove("temp_video.mp4")
        if os.path.exists("temp_audio.wav"):
            os.remove("temp_audio.wav")


def generate_questions(extracted_text, student_category, num_questions=15):
    difficulty_mapping = {
        "Mild": "challenging questions with in-depth analysis",
        "Moderate": "moderate difficulty questions covering essential concepts",
        "Severe": "basic, simple, and easy-to-understand questions"
    }
    difficulty = difficulty_mapping.get(student_category, "Moderate")

    prompt = f"""
    Generate {num_questions} questions based on the following content.
    The questions should be {difficulty}.
    Include:
    - Multiple-choice questions (MCQs) with four options
    - Fill in the blanks
    - True or false questions
    - Multiple select questions (MSQs)

    Each question should clearly indicate the correct answer.

    Content:
    {extracted_text}

    Return output in JSON format:
    {{
        "questions": [
            {{"type": "mcq", "question": "What is XYZ?", "options": ["A", "B", "C", "D"], "answer": "A"}},
            {{"type": "fill_in_the_blank", "question": "The capital of France is ___.", "answer": "Paris"}},
            {{"type": "true_false", "question": "The sun rises in the west.", "answer": "False"}},
            {{"type": "msq", "question": "Select the prime numbers:", "options": ["2", "3", "4", "5"], "answer": ["2", "3", "5"]}}
        ]
    }}
    """

    response = model_post.generate_content(prompt)
    try:
        parsed = json.loads(response.candidates[0].content.parts[0].text.strip())
        # Always return a dict with "questions"
        if isinstance(parsed, dict) and "questions" in parsed:
            return parsed
        elif isinstance(parsed, list):
            return {"questions": parsed}
        else:
            raise ValueError("Unexpected Gemini response format")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini API returned invalid JSON: {str(e)}")


@app.post("/api/post_assessment")
async def post_assessment(data: AssessmentRequest):
    try:
        print(f"📩 Processing POST assessment for {data.student_email} on module {data.module_id}")

        try:
            module_id = ObjectId(data.module_id)
        except:
            raise HTTPException(status_code=400, detail="Invalid module ID format")

        student = students_collection.find_one({"email": data.student_email})
        if not student:
            raise HTTPException(status_code=404, detail="Student not found")

        student_category = student.get("category", "Moderate")

        module = modules_collection.find_one({"_id": module_id})
        if not module:
            raise HTTPException(status_code=404, detail="Module not found")

        video_url = module.get("videoUrl")
        if not video_url:
            raise HTTPException(status_code=400, detail="Module does not have a video URL")

        extracted_text = extract_text_from_video(video_url)
        questions = generate_questions(extracted_text, student_category)

        return {"questions": questions["questions"]}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
