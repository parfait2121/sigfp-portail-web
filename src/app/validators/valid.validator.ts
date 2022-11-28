import { AbstractControl, ValidationErrors, ValidatorFn , FormGroup} from '@angular/forms';
import { UserService } from './../_services/user.service';
import { Directive, OnInit, forwardRef, Input, Injector } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';




export function validValidator(): ValidatorFn {
    return (ctrl: AbstractControl): null | ValidationErrors => {
       var userService : UserService;
       let injector = Injector.create([{provide:UserService , useClass:UserService,deps: []}])
      let service  = injector.get(UserService);

      var access = false;
      console.log(ctrl);



        if (access) {
            return null;

        } else {
          console.log(ctrl.value);
            return {
                validValidator: ctrl.value

            };
        }

    };
}
