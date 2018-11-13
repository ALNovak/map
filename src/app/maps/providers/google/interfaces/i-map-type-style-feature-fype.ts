export interface IMapTypeStyleFeatureType {
    administrative?: {
        country?: string;
        land_parcel?: string;
        locality?: string;
        neighborhood?: string;
        province?: string;
    };
    all?: string;
    landscape?: {
        man_made?: string;
        natural?: string;
    };
    poi?: {
        attraction?: string;
        business?: string;
        government?: string;
        medical?: string;
        park?: string;
        place_of_worship?: string;
        school?: string;
        sports_complex?: string;
    };
    road?: {
        arterial?: string;
        highway?: {
            controlled_access?: string;
        };
        local?: string;
    };
    transit?: {
        line?: string;
        station?: {
            airport?: string;
            bus?: string;
            rail?: string;
        };
    };
    water?: string;
}