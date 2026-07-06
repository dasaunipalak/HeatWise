interface LegendProps {
    type: string;
}


export default function Legend({ type }: LegendProps) {

    let title = "";
    let subtitle = "";
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

        case "ndbi_builtup":
            title = "Built-up Density (NDBI)";
            subtitle = "Impervious Surface Density";
            labels = ["Low Built-up", "High Built-up"];
            gradient = "linear-gradient(to right, #22C55E, #FACC15, #EF4444)";
            break;

        case "ndwi_water":
            title = "Water Presence (NDWI)";
            subtitle = "Normalized Difference Water Index (NDWI)";
            labels = ["Low Water Presence", "High Water Presence"];
            gradient = "linear-gradient(to right, #854d0e, #06b6d4, #1d4ed8)";
            break;

        case "lulc_classification":
            title = "Land Use Classification (LULC)";
            subtitle = "Land Cover Categories";
            break;

        default:
            title = "Surface Temperature (°C)";
            subtitle = "Ground Surface Temperature";
            labels = ["<0", "10", "20", "30", "40", "50", ">60"];
            gradient = "linear-gradient(to right, #1D4ED8, #06B6D4, #22C55E, #FACC15, #F97316, #DC2626, #7F1D1D)";
    }

    return (
        <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-3 rounded-xl w-60 border border-slate-200 shadow-lg z-20 select-none">

            {/* Title */}
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h3 className="text-[12px] font-semibold text-slate-800 leading-tight">
                        {title}
                    </h3>

                    <p className="text-[9px] text-slate-500 mt-0.5 leading-none">
                        {subtitle}
                    </p>
                </div>
            </div>

            {type === "lulc_classification" ? (
                /* LULC discrete color chips */
                <div className="grid grid-cols-2 gap-x-3 gap-y-2 mt-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm bg-[#166534] border border-slate-200/50 flex-shrink-0"></div>
                        <span className="text-[9.5px] font-medium text-slate-700">Forest</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm bg-[#22c55e] border border-slate-200/50 flex-shrink-0"></div>
                        <span className="text-[9.5px] font-medium text-slate-700">Vegetation</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm bg-[#eab308] border border-slate-200/50 flex-shrink-0"></div>
                        <span className="text-[9.5px] font-medium text-slate-700">Agriculture</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm bg-[#ef4444] border border-slate-200/50 flex-shrink-0"></div>
                        <span className="text-[9.5px] font-medium text-slate-700">Built-up</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm bg-[#3b82f6] border border-slate-200/50 flex-shrink-0"></div>
                        <span className="text-[9.5px] font-medium text-slate-700">Water</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm bg-[#e2e8f0] border border-slate-200/50 flex-shrink-0"></div>
                        <span className="text-[9.5px] font-medium text-slate-700">Barren Land</span>
                    </div>
                </div>
            ) : (
                /* Continuous gradient scale */
                <>
                    <div
                        className="h-3 rounded-full mt-2"
                        style={{ background: gradient }}
                    />

                    {/* Tick Marks (only for scales with intermediate tick labels) */}
                    {labels.length > 2 && (
                        <div className="flex justify-between px-1 mt-1">
                            {Array.from({ length: labels.length }).map((_, i) => (
                                <div
                                    key={i}
                                    className="w-px h-1 bg-slate-300"
                                />
                            ))}
                        </div>
                    )}

                    {/* Labels */}
                    <div className="flex justify-between text-[9px] font-medium text-slate-500 mt-1.5 px-0.5">
                        {labels.map((label) => (
                            <span key={label}>{label}</span>
                        ))}
                    </div>
                </>
            )}

        </div>
    );
}