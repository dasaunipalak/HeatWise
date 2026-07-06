from fastapi import APIRouter

from app.services.layer_service import get_gee_tile_url

router = APIRouter()


@router.get("/{layer_type}")
async def get_map_layer(layer_type: str):

    url = get_gee_tile_url(layer_type)

    return {
        "tile_url": url
    }