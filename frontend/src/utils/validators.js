export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validateProductForm = (data) => {
  const errors = {}
  
  if (!data.name || data.name.trim() === '') {
    errors.name = 'Product name is required'
  }
  
  if (!data.sku || data.sku.trim() === '') {
    errors.sku = 'SKU is required'
  }
  
  if (!data.price || data.price <= 0) {
    errors.price = 'Price must be greater than 0'
  }
  
  if (data.quantity === undefined || data.quantity < 0) {
    errors.quantity = 'Quantity cannot be negative'
  }
  
  return errors
}

export const validateCustomerForm = (data) => {
  const errors = {}
  
  if (!data.full_name || data.full_name.trim() === '') {
    errors.full_name = 'Full name is required'
  }
  
  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Valid email is required'
  }
  
  if (data.phone && data.phone.trim().length > 50) {
    errors.phone = 'Phone number is too long'
  }
  
  return errors
}
