from fastapi import APIRouter

from app.services.layer_service import get_tile_url_for_layer

router = APIRouter()


@router.get("/{layer_type}")
async def get_map_layer(layer_type: str):

    url = get_tile_url_for_layer(layer_type)

    return {
        "tile_url": url
    }