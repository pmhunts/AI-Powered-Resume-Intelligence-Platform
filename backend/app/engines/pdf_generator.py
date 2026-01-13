from jinja2 import Environment, FileSystemLoader
import os
from xhtml2pdf import pisa
from typing import Dict, Any
import io

class PDFGenerator:
    def __init__(self):
        # Setup Jinja2 environment
        template_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "templates")
        self.env = Environment(loader=FileSystemLoader(template_dir))

    def generate(self, resume_data: Dict[str, Any]) -> bytes:
        template = self.env.get_template("resume.html")
        
        # Render HTML
        html_content = template.render(resume=resume_data)
        
        # Generate PDF using xhtml2pdf
        pdf_buffer = io.BytesIO()
        pisa_status = pisa.CreatePDF(
            io.BytesIO(html_content.encode('utf-8')),
            dest=pdf_buffer
        )
        
        if pisa_status.err:
            raise Exception("PDF Generation Error")
            
        return pdf_buffer.getvalue()

pdf_generator = PDFGenerator()
