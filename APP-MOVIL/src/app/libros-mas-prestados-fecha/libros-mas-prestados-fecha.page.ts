import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PrestamoFecha } from 'src/app/modelos/LoginResponse';
import { Loading } from 'src/app/shared/loading/loading';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import Chart from 'chart.js/auto';
import { LoadingService } from 'src/app/shared/loading-service';
import { ServiciosApi } from '../Servicios/servicios-api';
@Component({
  selector: 'app-libros-mas-prestados-fecha',
  templateUrl: './libros-mas-prestados-fecha.page.html',
  styleUrls: ['./libros-mas-prestados-fecha.page.scss'],
  standalone:false

})
export class LibrosMasPrestadosFechaPage implements OnInit {

  
@ViewChild('graficaContainer', { static: false }) graficaContainer!: ElementRef;


  @ViewChild('barCanvas', { static: false }) barCanvas!: ElementRef;
  barChart: any;

  constructor(private service: ServiciosApi, private loadingService: LoadingService) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
        this.loadingService.show();

    this.service.obtenerTop10Fechas().subscribe({
      next: (data: PrestamoFecha[]) => {
      this.loadingService.hide();
        const labels = data.map(x => `${x.fecha}`);
        const totales = data.map(x => x.totalPrestamos);

        const colores = totales.map(() =>
          `hsl(${Math.floor(Math.random() * 360)}, 70%, 55%)`
        );

        this.barChart = new Chart(this.barCanvas.nativeElement, {
          type: 'bar',
          data: {
            labels,
            datasets: [{
              label: 'Total de préstamos',
              data: totales,
              backgroundColor: colores
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
             layout: {
      padding: {
        top: 50
      }
    },
            plugins: {
              legend: { display: false },
              tooltip: { enabled: true }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: { precision: 0 }
              },
              x: {
                ticks: {
                  callback: function(value) {
                    const index = Number(value);
                    return this.getLabelForValue(index).split('\n');
                  }
                }
              }
            }
          },
          
          plugins: [this.mostrarValoresPlugin]
        });

      }
    });
  }


   mostrarValoresPlugin = {
  id: 'mostrarValores',
  afterDatasetsDraw(chart: any) {
    const ctx = chart.ctx;

    chart.data.datasets.forEach((dataset: any, i: number) => {
      const meta = chart.getDatasetMeta(i);

      meta.data.forEach((bar: any, index: number) => {
        const valor = dataset.data[index];

        ctx.fillStyle = "#000"; 
        ctx.font = "12px Arial";
        ctx.textAlign = "center";

        const x = bar.x;
        const y = bar.y - 5; 

        ctx.fillText(valor, x, y);
      });
    });
  }
};


  async exportarPDF() {
  const element = this.graficaContainer.nativeElement;

  const canvas = await html2canvas(element, {
    scale: 3,
    useCORS: true
  });

  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: 'a4'
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);

  pdf.save('grafica-prestamos.pdf');
}

}
