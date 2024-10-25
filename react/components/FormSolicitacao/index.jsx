import React from 'react';
import { useState, useEffect } from 'react';
import classes from './custom.form.css';
import { useProduct } from 'vtex.product-context';

const FormSolicitacao = ({nome,link}) => {
    useEffect(() => {
        window.cfields = { '61': 'nome_do_produto', '62': 'link_do_produto' };
    
        window._show_thank_you = (id, message, trackcmp_url, email) => {
          const form = document.getElementById(`_form_${id}_`);
          const thank_you = form.querySelector('._form-thank-you');
          form.querySelector('._form-content').style.display = 'none';
          thank_you.innerHTML = message;
          thank_you.style.display = 'block';
          const vgoAlias = typeof window.visitorGlobalObjectAlias === 'undefined' ? 'vgo' : window.visitorGlobalObjectAlias;
          const visitorObject = window[vgoAlias];
          if (email && typeof visitorObject !== 'undefined') {
            visitorObject('setEmail', email);
            visitorObject('update');
          } else if (typeof trackcmp_url !== 'undefined' && trackcmp_url) {
            _load_script(trackcmp_url);
          }
          if (typeof window._form_callback !== 'undefined') window._form_callback(id);
        };
    
        window._show_error = (id, message, html) => {
          const form = document.getElementById(`_form_${id}_`);
          const err = document.createElement('div');
          const button = form.querySelector('button');
          const old_error = form.querySelector('._form_error');
          if (old_error) old_error.parentNode.removeChild(old_error);
          err.innerHTML = message;
          err.className = '_error-inner _form_error _no_arrow';
          const wrapper = document.createElement('div');
          wrapper.className = '_form-inner';
          wrapper.appendChild(err);
          button.parentNode.insertBefore(wrapper, button);
          const submitButton = form.querySelector('[id^="_form"][id$="_submit"]');
          submitButton.disabled = false;
          submitButton.classList.remove('processing');
          if (html) {
            const div = document.createElement('div');
            div.className = '_error-html';
            div.innerHTML = html;
            err.appendChild(div);
          }
        };
    
        window._load_script = (url, callback, isSubmit) => {
          const head = document.querySelector('head');
          const script = document.createElement('script');
          script.charset = 'utf-8';
          script.src = url;
          let r = false;
          const submitButton = document.querySelector('#_form_88_submit');
    
          if (callback) {
            script.onload = script.onreadystatechange = function () {
              if (!r && (!this.readyState || this.readyState === 'complete')) {
                r = true;
                callback();
              }
            };
          }
          script.onerror = function () {
            if (isSubmit) {
              if (script.src.length > 10000) {
                _show_error('88', 'Desculpe, seu envio falhou. Deixe suas respostas mais curtas e tente novamente.');
              } else {
                _show_error('88', 'Desculpe, seu envio falhou. Tente novamente.');
              }
              submitButton.disabled = false;
              submitButton.classList.remove('processing');
            }
          };
          head.appendChild(script);
        };
      }, []);
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const form = document.getElementById('_form_88_');
        const serialized = new URLSearchParams(new FormData(form)).toString();
        
        window._load_script(`https://tecfag98486.activehosted.com/proc.php?${serialized}&jsonp=true`, null, true);
      };
    return (<>
    <div className={classes.formularioprod}>
    <form method="POST" action="https://tecfag98486.activehosted.com/proc.php" id="_form_88_" className="_form _form_88 _inline-form  _dark" novalidate data-styles-version="5">
      <input type="hidden" name="u" value="88" />
      <input type="hidden" name="f" value="88" />
      <input type="hidden" name="s" />
      <input type="hidden" name="c" value="0" />
      <input type="hidden" name="m" value="0" />
      <input type="hidden" name="act" value="sub" />
      <input type="hidden" name="v" value="2" />
      <input type="hidden" name="or" value="b0ff3c74149cb0a3e2e2675bcac1b4fd" />
      <div className="_form-content">
        <div className="_form_element _x23894340 _full_width " >
          <label for="fullname" className={classes.formulariolabel}>
            Nome*
          </label>
          <div className="_field-wrapper">
            <input type="text" id="fullname" name="fullname" placeholder="Nome" required/>
          </div>
        </div>
        <div className="_form_element _x15232127 _full_width " >
          <label for="email" className={classes.formulariolabel}>
            E-mail*
          </label>
          <div className="_field-wrapper">
            <input type="text" id="email" name="email" placeholder="E-mail" required/>
          </div>
        </div>
        <div className="_form_element _x48744690 _full_width " >
          <label for="phone" className={classes.formulariolabel}>
            Telefone*
          </label>
          <div className="_field-wrapper">
            <input type="text" id="phone" name="phone" placeholder="Telefone" required/>
          </div>
        </div>
        <div className={classes.formularioesconde} >
          <label for="field[61]" className={classes.formulariolabel}>
            Nome do produto*
          </label>
          <div className="_field-wrapper">
            <input type="text" id="field[61]" name="field[61]" value={nome} placeholder="Nome do produto" required/>
          </div>
        </div>
        <div className={classes.formularioesconde} >
          <label for="field[62]" className="_form-label">
            Link do produto*
          </label>
          <div className="_field-wrapper">
            <input type="text" id="field[62]" name="field[62]" value={link} placeholder="Link do produto" required/>
          </div>
        </div>
        <div className={classes.formularioenviar}>
          <button id="_form_88_submit" className="_submit" type="submit" onClick={handleSubmit}>
            Enviar
          </button>
        </div>
        <div className="_clear-element">
        </div>
      </div>
      <div className="_form-thank-you" style={{display:"none"}}>
      </div>
    </form>
    </div>
    </>)
}
export { FormSolicitacao };