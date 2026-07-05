interface LegendProps {
    type: string;
}


export default function Legend({ type }: LegendProps) {

    let title = "";
    let subtitle = "";

    switch (type) {
        case "surface_temp":
            title = "Surface Temperature (°C)";
            subtitle = "Ground Surface Temperature";
            break;

        case "ndvi_veg":
            title = "Vegetation Index (NDVI)";
            subtitle = "Normalized Difference Vegetation Index";
            break;

        case "uhi_index":
            title = "Urban Heat Island";
            subtitle = "Urban vs Rural Temperature Difference";
            break;

        case "wind_corridors":
            title = "Wind Corridors";
            subtitle = "Dominant Wind Flow";
            break;

        case "surface_albedo":
            title = "Surface Albedo";
            subtitle = "Surface Reflectivity";
            break;

        default:
            title = "Surface Temperature (°C)";
            subtitle = "Ground Surface Temperature";
    }

    let gradient = "";
    let labels: string[] = [];

    switch (type) {
        case "surface_temp":
            title = "Surface Temperature (°C)";
            subtitle = "Ground Surface Temperature";
            labels = ["<0", "10", "20", "30", "40", "50", ">60"];
            gradient = "linear-gradient(to right, #1D4ED8, #06B6D4, #22C55E, #FACC15, #F97316, #DC2626, #7F1D1D)";
            break;

        case "ndvi_veg":
            title = "Vegetation Index (NDVI)";
            subtitle = "Normalized Difference Vegetation Index";
            labels = ["-1", "-0.5", "0", "0.5", "0.7", "0.9", "1"];
            gradient = "linear-gradient(to right, #3B82F6, #9CA3AF, #FACC15, #4ADE80, #166534)";
            break;

        case "uhi_index":
            title = "Urban Heat Island";
            subtitle = "Urban vs Rural Temperature Difference";
            labels = ["0", "1", "2", "3", "5", "7", ">8"];
            gradient = "linear-gradient(to right, #FEF08A, #FACC15, #FB923C, #EF4444, #7F1D1D)";
            break;

        case "wind_corridors":
            title = "Wind Corridors";
            subtitle = "Dominant Wind Flow";
            labels = ["0", "5", "10", "20", "30", "40", ">50"];
            gradient = "linear-gradient(to right, #DBEAFE, #93C5FD, #3B82F6, #1D4ED8)";
            break;

        case "surface_albedo":
            title = "Surface Albedo";
            subtitle = "Surface Reflectivity";
            labels = ["0", "0.2", "0.4", "0.6", "0.8", "0.9", "1"];
            gradient = "linear-gradient(to right, #111827, #6B7280, #D1D5DB, #FFFFFF)";
            break;

        default:
            title = "Surface Temperature (°C)";
            subtitle = "Ground Surface Temperature";
            gradient = "linear-gradient(to right, #1D4ED8, #06B6D4, #22C55E, #FACC15, #F97316, #DC2626, #7F1D1D)";
    }



    return (
        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-3 rounded-xl w-60 border border-slate-200 shadow-lg z-20 select-none">

            {/* Title */}
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h3 className="text-[13px] font-semibold text-slate-800">
                        {title}
                    </h3>

                    <p className="text-[9px] text-slate-500">
                        {subtitle}
                    </p>
                </div>
            </div>

            {/* Gradient */}
            <div
                className="h-3 rounded-full"
                style={{ background: gradient }}
            />

            {/* Tick Marks */}
            <div className="flex justify-between px-1 mt-1">
                {Array.from({ length: 7 }).map((_, i) => (
                    <div
                        key={i}
                        className="w-px h-2 bg-slate-400"
                    />
                ))}
            </div>

            {/* Labels */}
            <div className="flex justify-between text-[9px] font-medium text-slate-600 mt-2">
                {labels.map((label) => (
                    <span key={label}>{label}</span>
                ))}
            </div>

        </div>
    );
}