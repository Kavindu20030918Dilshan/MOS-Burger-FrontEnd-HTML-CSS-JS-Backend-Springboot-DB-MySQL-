package edu.kavindu.controller;

import edu.kavindu.dto.Orders;
import edu.kavindu.service.OrdersService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.xml.JRXmlLoader;
import net.sf.jasperreports.view.JasperViewer;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
@CrossOrigin
public class OrderController {
    final OrdersService service;

    @GetMapping("/get-all")
    public List<Orders> getAll(){
        return service.getAll();
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public void add(@RequestBody Orders orders){
        service.add(orders);
    }

    @GetMapping("/search-by-mobile/{customerMobile}")
    public List<Orders> searchByCustomerMobile(@PathVariable String customerMobile){
        return service.searchByCustomerMobile(customerMobile);
    }

    @GetMapping("/get-full-report")
    public void getAllOrderReport(HttpServletResponse response) {
        try {
            InputStream reportStream = getClass().getResourceAsStream("/reports/OrderHistory.jrxml");
            if (reportStream == null) {
                throw new RuntimeException("Report template not found!");
            }

            JasperDesign design = JRXmlLoader.load(reportStream);
            JasperReport jasperReport = JasperCompileManager.compileReport(design);

            List<Orders> ordersList = service.getAllOrderReport();


            Map<String, Object> parameters = new HashMap<>();

            ordersList.forEach(orders -> {
                parameters.put("Parameter1",orders.getId());
                parameters.put("Parameter2",orders.getCustomerName());
                parameters.put("Parameter3",orders.getCustomerMobile());
                parameters.put("Parameter4",orders.getDateAndTime());
                parameters.put("Parameter5",orders.getItems());
                parameters.put("Parameter6",orders.getSubTotal());
                parameters.put("Parameter7",orders.getDiscount());
                parameters.put("Parameter8",orders.getTotal());
            });

            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(ordersList);
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "attachment; filename=orders_report.pdf");

            OutputStream outputStream = response.getOutputStream();
            JasperExportManager.exportReportToPdfStream(jasperPrint, outputStream);
            outputStream.flush();
            outputStream.close();

        } catch (JRException | IOException e) {
            throw new RuntimeException("Error generating report", e);
        }
    }

}

