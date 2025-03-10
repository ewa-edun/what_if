from flask import Flask
from flask_cors import CORS
from api.routes import main_routes
import api.config as config

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    # Register blueprints
    app.register_blueprint(main_routes.bp)
    
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host='0.0.0.0', port=config.PORT, debug=config.DEBUG)
