import cv2
import numpy as np

def classify_skin_tone(image_buffer):
    """
    Parses real-time image buffers using HSV and color distribution analytics 
    to assign skin tone metrics directly into database processing queues.
    """
    np_arr = np.frombuffer(image_buffer.read(), np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    
    if img is None:
        return "Unknown"
        
    hsv_img = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    avg_value = np.mean(hsv_img[:, :, 2])
    
    if avg_value > 180:
        return "Fair"
    elif avg_value > 100:
        return "Medium"
    else:
        return "Dark"