# import face_recognition
# import cv2
# import numpy as np

# # Get a reference to webcam #0 (the default one)
# video_capture = cv2.VideoCapture(0)

# face_locations = []
# face_landmarks_list = []
# process_this_frame = True

# while True:
#     ret, frame = video_capture.read()
#     small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)

#     rgb_small_frame = small_frame[:, :, ::-1]

#     if process_this_frame:
#         face_locations = face_recognition.face_locations(rgb_small_frame)
# 		face_landmarks_list  face_recognition.face-landmarks(frame)
#     process_this_frame = not process_this_frame

#     for top, right, bottom, left in face_locations:
#         top *= 4
#         right *= 4
#         bottom *= 4
#         left *= 4
# 		cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

#     cv2.imshow('Video', frame)

#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# video_capture.release()
# cv2.destroyAllWindows()

import cv2

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')
smile_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_smile.xml')
process_this_frame = True

cams = []

video_capture = cv2.VideoCapture(0)
while True:
	ret, frame = video_capture.read()
	gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
	if process_this_frame:
		face_locations = face_cascade.detectMultiScale(gray, 1.3, 5)
	process_this_frame = not process_this_frame
	for (x,y,w,h) in face_locations:
		cv2.rectangle(frame,(x,y),(x+w,y+h),(255,0,0),2)
		roi_gray = gray[y:y+h, x:x+w]
		roi_color = frame[y:y+h, x:x+w]
		eyes = eye_cascade.detectMultiScale(roi_gray)
		for (ex,ey,ew,eh) in eyes:
			cv2.rectangle(roi_color,(ex,ey),(ex+ew,ey+eh),(0,255,0),2)
	cv2.imshow('Video', frame)
	if cv2.waitKey(1) & 0xFF == ord('q'):
		break

video_capture.release()
cv2.destroyAllWindows()