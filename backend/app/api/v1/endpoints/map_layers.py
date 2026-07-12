from datetime import datetime

from fastapi import APIRouter, HTTPException
from app.services.layer_service import get_gee_tile_url

router = APIRouter()


@router.get("/{layer_type}")
def get_map_layer(layer_type: str):
    tile_url = get_gee_tile_url(
        layer_type,
        datetime.utcnow().strftime("%Y-%m-%d"),
    )

    if not tile_url:
        raise HTTPException(status_code=404, detail="Unknown map layer")

    return {"tile_url": tile_url}