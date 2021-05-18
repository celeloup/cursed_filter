import cv2
import face_recognition

video_capture = cv2.VideoCapture(0)

face_locations = []
print("starting")
while True:
	ret, frame = video_capture.read()
	rgb_frame = frame[:, :, ::-1]
	face_locations = face_recognition.face_locations(rgb_frame)
	for top, right, bottom, left in face_locations:
		cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
	cv2.imshow('full face', frame)
	if cv2.waitKey(1) & 0xFF == ord('q'):
		print("stop")
		break

video_capture.release()
cv2.destroyAllWindows()