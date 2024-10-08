import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  cred: Credenciais = {
    email: '',
    senha: ''
  }

  hide = true;
  email = new UntypedFormControl(null,Validators.email);
  senha = new UntypedFormControl(null,Validators.minLength(3));

  constructor(private toast: ToastrService, private service: AuthService, private router: Router){}

  ngOnInit(): void {
  }

  logar(){
   this.service.authenticate(this.cred).subscribe(resposta => {
    this.service.successLogin(resposta.headers.get('Authorization').substring(7))
    this.router.navigate([''])
   }, () => { 
    this.toast.error('Usuário e/ou senha inválidos')
   })
  }

  submitOnEnter(event: KeyboardEvent) {
    console.log("entrou aqui")
    event.preventDefault();
    if (this.senha.valid && this.email.valid) {
      this.logar();
    }
  }

  validaCampos(): boolean{
   return this.email.valid && this.senha.valid
  }
}
