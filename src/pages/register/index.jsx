import { useNavigate } from "react-router-dom";
import { MdPerson, MdEmail, MdLock } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';

import { useForm } from "react-hook-form";


import { Container, Title, Column, TitleRegister, SubtitleRegister, LogarText, Row, Wrapper } from './styles';

const Register = () => {

    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try {
            const { data } = await api.get(`/users?email=${formData.email}&senha=${formData.senha}`);

            if (data.length && data[0].id) {
                navigate('/feed')
                return
            }

            alert('Usuário ou senha inválido')
        } catch (e) {
            //TODO: HOUVE UM ERRO
            alert(`Houve um erro ${e.err}`)
        }
    };

    console.log('errors', errors);

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                    <TitleRegister>Comece agora grátis</TitleRegister>
                    <SubtitleRegister>Crie sua conta e make the change._</SubtitleRegister>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input placeholder="Nome Completo" leftIcon={<MdPerson />} name="name" control={control} />
                        {errors.email && <span>Nome completo é obrigatório</span>}
                        <Input placeholder="Nome Completo" leftIcon={<MdPerson />} name="name" control={control} />
                        {errors.email && <span>E-mail é obrigatório</span>}
                        <Input type="password" placeholder="Senha" leftIcon={<MdLock />} name="senha" control={control} />
                        {errors.senha && <span>Senha é obrigatório</span>}
                        <Button title="Criar minha conta" variant="secondary" type="submit" />
                    </form>
                    <Column>
                        <SubtitleRegister>Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.</SubtitleRegister>
                        <SubtitleRegister>Já tenho conta. <LogarText>Fazer login</LogarText></SubtitleRegister>
                    </Column>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Register }