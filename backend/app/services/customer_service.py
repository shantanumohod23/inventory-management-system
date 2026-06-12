from sqlalchemy.orm import Session
from typing import Optional
import math
from app.repositories.customer_repository import CustomerRepository
from app.schemas.customer import CustomerCreate, CustomerResponse, CustomerListResponse
from app.core.exceptions import NotFoundError, ConflictError


class CustomerService:
    def __init__(self, db: Session):
        self.db = db
        self.repo = CustomerRepository(db)

    def create_customer(self, data: CustomerCreate) -> CustomerResponse:
        existing = self.repo.get_by_email(data.email)
        if existing:
            raise ConflictError(f"Customer with email '{data.email}' already exists")
        
        customer = self.repo.create(data)
        self.db.commit()
        self.db.refresh(customer)
        return CustomerResponse.model_validate(customer)

    def get_customer(self, customer_id: int) -> CustomerResponse:
        customer = self.repo.get_by_id(customer_id)
        if not customer:
            raise NotFoundError("Customer", customer_id)
        return CustomerResponse.model_validate(customer)

    def list_customers(
        self,
        page: int = 1,
        page_size: int = 20,
        search: Optional[str] = None,
        sort_by: str = "id",
        sort_order: str = "asc",
    ) -> CustomerListResponse:
        items, total = self.repo.get_many(page, page_size, search, sort_by, sort_order)
        pages = math.ceil(total / page_size) if total > 0 else 1
        return CustomerListResponse(
            items=[CustomerResponse.model_validate(c) for c in items],
            total=total,
            page=page,
            page_size=page_size,
            pages=pages,
        )

    def delete_customer(self, customer_id: int) -> None:
        customer = self.repo.get_by_id(customer_id)
        if not customer:
            raise NotFoundError("Customer", customer_id)
        self.repo.delete(customer)
        self.db.commit()
