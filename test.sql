INSERT INTO Sales.SpecialDeals(
SpecialDealID,DealDescription, StartDate, EndDate, DiscountPercentage, LastEditedBy, LastEditedWhen)
VALUES ('3','25% off in Decemder', '2017-12-1','2017-12-31','25','1','2017-11-06')

UPDATE Sales.SpecialDeals
SET EndDate = '2017-12-31', DealDescription = '10% 2017 USB Wingtip'
WHERE SpecialDealID = 1

select OrderLineID, 
    Quantity,
	UnitPrice,
	TaxRate,
	Quantity*UnitPrice AS ExtendedPrice,
	Quantity*UnitPrice*(TaxRate/100) AS TaxDua,
	Format((Quantity*UnitPrice) + (Quantity*UnitPrice*(TaxRate/100)), 'C') AS TotalPrice
from Sales.OrderLines