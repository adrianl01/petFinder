"use client";

import { useEffect, useMemo, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

import { ReportResponse } from "@/src/types/report";
import MapView from "../map/MapView";
import BottomNavigation from "../layout/BottomNavigation";
import { getReportsNearMe } from "@/src/lib/api/reports";


export default function MapScreen() {
  
  const [reports, setReports] = useState<ReportResponse[]>([]);

  useEffect(()=>{
    async function fetchReports() {
          const data = (await getReportsNearMe()) as ReportResponse[];
          setReports(data);
        }
        fetchReports();
  },[])


  const filteredReports = useMemo(() => {
    return reports.filter(report => report.isActive);
  }, [reports]);

  return (
    <main className="relative h-screen overflow-hidden bg-white pb-16">
      <MapView reports={filteredReports} />
      <BottomNavigation />
    </main>
  );
}