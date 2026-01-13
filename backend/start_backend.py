import uvicorn
import os
import sys
import socket
import time
import subprocess
import signal

def is_port_in_use(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

def kill_process_on_port(port):
    print(f"Checking for process on port {port}...")
    try:
        # Window-specific command to find PID
        cmd = f"netstat -ano | findstr :{port}"
        output = subprocess.check_output(cmd, shell=True).decode()
        lines = output.strip().split('\n')
        for line in lines:
            parts = line.split()
            if len(parts) > 4:
                pid = parts[-1] 
                if pid == '0': continue # Skip system process
                print(f"Killing PID {pid} on port {port}...")
                subprocess.run(f"taskkill /F /PID {pid}", shell=True)
                time.sleep(1) # Wait for kill
    except subprocess.CalledProcessError:
        print(f"No process found on port {port}")
    except Exception as e:
        print(f"Error killing process: {e}")

if __name__ == "__main__":
    PORT = 8000
    
    # Pre-flight cleanup
    kill_process_on_port(PORT)
    
    # Double check
    if is_port_in_use(PORT):
        print(f"[ERR] Port {PORT} is still in use. Switching to 8001...")
        PORT = 8001
        kill_process_on_port(PORT)
        
        # Update .env or config if possible, but for now we set env var
        os.environ["PORT"] = str(PORT)
        print(f"[WARN] Backend will start on port {PORT}. Frontend might need config update!")
    
    print(f"Starting Backend on http://0.0.0.0:{PORT}")
    
    # Start Uvicorn
    # Using workers=1 because we don't need multi-processing for development
    # reload=True for dev changes
    uvicorn.run("app.main:app", host="0.0.0.0", port=PORT, reload=True, workers=1)
