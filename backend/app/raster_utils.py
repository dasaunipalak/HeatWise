from app.model_loader import raster


def get_pixel_from_coordinates(latitude, longitude):
    """
    Convert latitude and longitude into raster pixel.
    """
    row, col = raster.index(longitude, latitude)
    return row, col


def get_band_value(band_number, row, col):
    """
    Read one value from a raster band.
    """
    band = raster.read(band_number)
    return band[row, col]


def get_static_features(latitude, longitude):
    """
    Returns all static features required by the ML model.
    """

    row, col = get_pixel_from_coordinates(latitude, longitude)

    return {
        "NDVI": float(get_band_value(2, row, col)),
        "NDBI": float(get_band_value(3, row, col)),
        "NDWI": float(get_band_value(4, row, col)),
        "LULC_Map": int(get_band_value(5, row, col)),
        "Elevation": float(get_band_value(9, row, col)),
        "Avg_Radiation": float(get_band_value(10, row, col)),
    }