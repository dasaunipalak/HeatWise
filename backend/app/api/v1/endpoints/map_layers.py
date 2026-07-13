from datetime import datetime
from math import ceil, floor

from fastapi import APIRouter, HTTPException, Query
from app.services.layer_service import get_gee_tile_url

router = APIRouter()

GRID_SIZE = 0.25
BUFFER_DEGREES = 0.25


@router.get("/{layer_type}")
def get_map_layer(
    layer_type: str,
    north: float = Query(...),
    south: float = Query(...),
    east: float = Query(...),
    west: float = Query(...),
):
    if south >= north or west >= east:
        raise HTTPException(status_code=422, detail="Invalid map bounds")

    west = max(-180, floor((west - BUFFER_DEGREES) / GRID_SIZE) * GRID_SIZE)
    south = max(-90, floor((south - BUFFER_DEGREES) / GRID_SIZE) * GRID_SIZE)
    east = min(180, ceil((east + BUFFER_DEGREES) / GRID_SIZE) * GRID_SIZE)
    north = min(90, ceil((north + BUFFER_DEGREES) / GRID_SIZE) * GRID_SIZE)
    bounds_key = f"{west:.2f},{south:.2f},{east:.2f},{north:.2f}"

    tile_url = get_gee_tile_url(
        layer_type,
        datetime.utcnow().strftime("%Y-%m-%d"),
        bounds_key,
    )

    if not tile_url:
        raise HTTPException(status_code=404, detail="Unable to create map layer")

    return {"tile_url": tile_url}
