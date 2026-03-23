declare module "react-simple-maps" {
  import { ComponentType, SVGProps } from "react";

  export interface ProjectionConfig {
    rotate?: [number, number, number];
    center?: [number, number];
    scale?: number;
  }

  export interface ComposableMapProps extends SVGProps<SVGSVGElement> {
    projection?: string;
    projectionConfig?: ProjectionConfig;
    width?: number;
    height?: number;
  }

  export interface GeographiesChildrenProps {
    geographies: Record<string, unknown>[];
  }

  export interface GeographiesProps {
    geography: string;
    children: (data: GeographiesChildrenProps) => React.ReactNode;
  }

  export interface GeographyStyleMap {
    default?: React.CSSProperties;
    hover?: React.CSSProperties;
    pressed?: React.CSSProperties;
  }

  export interface GeographyProps extends Omit<SVGProps<SVGPathElement>, "style"> {
    geography: Record<string, unknown>;
    style?: GeographyStyleMap;
  }

  export interface MarkerProps extends SVGProps<SVGGElement> {
    coordinates: [number, number];
  }

  export interface ZoomableGroupProps {
    center?: [number, number];
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    children: React.ReactNode;
  }

  export const ComposableMap: ComponentType<ComposableMapProps>;
  export const Geographies: ComponentType<GeographiesProps>;
  export const Geography: ComponentType<GeographyProps>;
  export const Marker: ComponentType<MarkerProps>;
  export const ZoomableGroup: ComponentType<ZoomableGroupProps>;
}
