from fastapi import APIRouter, Query
from app.services.layer_service import get_gee_tile_url

router = APIRouter()

@router.get("/{layer_type}")
async def get_map_layer(
    layer_type: str,
    north: float = Query(...),
    south: float = Query(...),
    east: float = Query(...),
    west: float = Query(...)
):

    tile_url = get_gee_tile_url(
        layer_type,
        north,
        south,
        east,
        west
    )

    return {
        "tile_url": tile_url
    }