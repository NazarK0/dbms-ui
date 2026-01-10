from sqlalchemy.orm import Session
from src.app_admin.ui.pages.dashboard.widgets.model import Widget



def get_by_title(db: Session, title: str):
    return db.query(Widget).filter(Widget.name == title).first()


