import React, { useEffect } from 'react';
import classes from './custom.form.css';

const FormSolicitacao = ({ nome, link, domain }) => {
    useEffect(() => {
        window.cfields = { '61': 'nome_do_produto', '62': 'link_do_produto' };

        window._show_thank_you = (id, message, trackcmp_url, email) => {
            const form = document.getElementById(`_form_${id}_`);
            const thank_you = form.querySelector('._form-thank-you');
            form.querySelector('._form-content').style.display = 'none';
            thank_you.innerHTML = message;
            thank_you.style.display = 'block';
            // Resto da função
        };

        window._show_error = (id, message, html) => {
            // Implementação do _show_error
        };

        window._load_script = (url, callback, isSubmit) => {
            const head = document.querySelector('head');
            const script = document.createElement('script');
            script.charset = 'utf-8';
            script.src = url;
            let r = false;

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
                    // Mensagem de erro
                }
            };
            head.appendChild(script);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = document.getElementById('_form_88_');
        const serialized = new URLSearchParams(new FormData(form)).toString();

        // Cria o link completo
        const fullLink = `https://${domain}/${link}`;

        // Verifica se a função _load_script está disponível
        if (typeof window._load_script === 'function') {
            window._load_script(`https://tecfag98486.activehosted.com/proc.php?${serialized}&field[62]=${encodeURIComponent(fullLink)}&jsonp=true`, null, true);
        } else {
            console.error('A função _load_script não está definida.');
        }
    };

    return (
        <>
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
                        <div className="_form_element _x23894340 _full_width">
                            <label htmlFor="fullname" className={classes.formulariolabel}>
                                Nome*
                            </label>
                            <div className="_field-wrapper">
                                <input type="text" id="fullname" name="fullname" placeholder="Nome" required />
                            </div>
                        </div>
                        <div className="_form_element _x15232127 _full_width">
                            <label htmlFor="email" className={classes.formulariolabel}>
                                E-mail*
                            </label>
                            <div className="_field-wrapper">
                                <input type="text" id="email" name="email" placeholder="E-mail" required />
                            </div>
                        </div>
                        <div className="_form_element _x48744690 _full_width">
                            <label htmlFor="phone" className={classes.formulariolabel}>
                                Telefone*
                            </label>
                            <div className="_field-wrapper">
                                <input type="text" id="phone" name="phone" placeholder="Telefone" required />
                            </div>
                        </div>
                        <div className={classes.formularioesconde}>
                            <label htmlFor="field[61]" className={classes.formulariolabel}>
                                Nome do produto*
                            </label>
                            <div className="_field-wrapper">
                                <input type="text" id="field[61]" name="field[61]" value={nome} placeholder="Nome do produto" required />
                            </div>
                        </div>
                        <div className={classes.formularioesconde}>
                            <label htmlFor="field[62]" className="_form-label">
                                Link do produto*
                            </label>
                            <div className="_field-wrapper">
                                <input type="text" id="field[62]" name="field[62]" value={`https://${domain}/${link}`} placeholder="Link do produto" required readOnly />
                            </div>
                        </div>
                        <div className={classes.formularioenviar}>
                            <button id="_form_88_submit" className="_submit" type="submit" onClick={handleSubmit}>
                                Enviar
                            </button>
                        </div>
                        <div className="_clear-element"></div>
                    </div>
                    <div className="_form-thank-you" style={{ display: "none" }}></div>
                </form>
            </div>
        </>
    );
}

export { FormSolicitacao };