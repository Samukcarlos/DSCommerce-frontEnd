import './styles.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FormInput from '../../../components/FormInput';
import * as forms from '../../../utils/forms';
import * as productService  from '../../../services/product-service';
import * as categoryService from '../../../services/category-service';
import FormTextArea from '../../../components/FormTextArea';
import { CategoryDTO } from '../../../models/category';
import FormSelect from '../../../components/FormSelect';
import { selectStyles } from '../../../utils/select';

export default function ProductForm(){

  const params = useParams();

  const navigate = useNavigate();

  const isEditing = params.productId !== 'create';

  const [categories, setCategories]= useState<CategoryDTO[]>([]);

  const [formData, setFormData] = useState<any> ({
   
    name: {
            value: "",
            id: "name",
            name: "name",
            type: "text",
            placeholder: "Nome",
            validation: function(value: string){
                  return /^.{3,80}$/.test(value);
            },
            message: ""
          },
    price: {
            value: "",
            id: "price",
            name: "price",
            type: "number",
            placeholder: "Preço",
            validation: function(value: any){
                return Number(value)>0;
            },
            massage: "Favor informar um valor positivo"
          },
    imgUrl: {
            value: "",
            id: "imgUrl",
            name: "imgUrl",
            type: "text",
            placeholder: "Imagem",
         },
         description: {
          value: "",
          id: "description",
          name: "description",
          type: "text",
          placeholder: "descrição",
          validation: function(value: string){
                return value.length >=10;
          },
          message: ""
         },
         categories: {
          value: [],
          id: "categories",
          name: "categories",
          placeholder: "Categorias",
          validation: function(value: CategoryDTO[]){
            return value.length > 0;
          },
          message: "Escolha ao menos uma categoria"
         }
});

useEffect(()=> {
      categoryService.findAllRequest()
            .then(response =>{
              setCategories(response.data)
            })
}, []);

  useEffect(()=> {

    const result = forms.toDirty(formData, "price");
    console.log(result);

    if (isEditing){
        productService.findById(Number(params.productId))
            .then(response => {  
                  const newFormData = formData.updateAll(formData, response.data);                
                  setFormData(newFormData);
            })
    }
  },[]);

function handleInputChange(event:any){
  const dataUpdated= forms.update(formData, event.target.name, event.target.value);
  const dataValidate= forms.validate(dataUpdated, event.target.name);
  setFormData (dataValidate);
}

function handleTurnyDirty(name: string){
  const newFormData  = forms.toDirty(formData, name);
        setFormData(newFormData);
}

    function handleSubmit(event:any){
      event.preventDefault();

      const formDataValidated = forms.dirtyAndValidationAll(formData); 
      if(forms.hasAnyInvalid(formDataValidated)){
        setFormData(formDataValidated);
        return;
      }

      const requestBody = forms.toValues(formData);
      if (isEditing){
        requestBody.id = params.productId;
      }

      const request = isEditing 
      ?  productService.updateRequest(requestBody)
      :   productService.insertRequest(requestBody);

      request
          .then(() => {
            navigate("/admin/products");
          })
          .catch(error => {
            const newInputs = forms.setBackendErrors(FormData, error.response.data.errors);
            setFormData(newInputs);
          });
          

      //const requestBody = forms.toValues(formData);

    }

    return(
        <main>
      <section id="product-form-section" className="dsc-container">
        <div className="dsc-product-form-container">
          <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
            <h2>Dados do produto</h2>
            <div className="dsc-form-controls-container">
              <div>
                  <FormInput
                      {...formData.name}
                      className="dsc-form-control"
                      onTurnDirty={handleTurnyDirty}
                      onChange={handleInputChange}
                  />
                  <div className='dsc-form-error'>{formData.name.message}</div>
              </div>
              <div>
                  <FormInput
                      {...formData.price}
                      className="dsc-form-control"
                      onTurnDirty={handleTurnyDirty}
                      onChange={handleInputChange}
                  />
                  <div className='dsc-form-error'>{formData.price.message}</div>
              </div>
              <div>
                  <FormInput
                      {...formData.imgUrl}
                      className="dsc-form-control"                      
                      onTurnDirty={handleTurnyDirty}
                      onChange={handleInputChange}
                  />
              </div>
                  <div>
                    <FormSelect
                        {...formData.categories}
                        styles={selectStyles}
                        className="dsc-form-control des-form-select-container"
                        options= {categories}
                        onChange={(obj: any) => {
                          const newFormData = forms.update(formData, "categories", obj);
                          setFormData(newFormData);
                        }}
                        onTurnDirty={handleTurnyDirty}
                        isMulti 
                        getOptionLabel={(obj: any) => obj.name}
                        getOptionValue={(obj: any) => String(obj.id)}
                    />
                    <div  className='dsc-form-error'>{formData.description.message}</div>
                  </div>

              <div>
                  <FormTextArea
                      {...formData.description}
                      className="dsc-form-control dsc-textarea"
                      onTurnDirty={handleTurnyDirty}
                      onChange={handleInputChange}
                  />
                  <div className='dsc-form-error'>{formData.description.message}</div>
              </div>
             
            </div>

            <div className="dsc-product-form-buttons">
              <Link to= "/admin/products">
                    <button type="reset" className="dsc-btn dsc-btn-white">Cancelar</button>
              </Link>
              
              <button type="submit" className="dsc-btn dsc-btn-blue">Salvar</button>
            </div>
          </form>
        </div>
      </section>
    </main>
    );
}