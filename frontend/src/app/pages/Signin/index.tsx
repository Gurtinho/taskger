import { FormEvent, useContext, useState } from 'react'
import { ButtonSuccess } from '../../shared/components/ui/Buttons/ButtonSuccess'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { AuthContext } from '../../shared/contexts/AuthContext'
import { InputForm } from '../../shared/components/ui/InputForm'

export const Signin = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { signin } = useContext(AuthContext)

	const handleSignin = async (event: FormEvent) => {
		event.preventDefault()
		try {
			if (email === '' || password === '') {
				return toast.error('Preencha todos os campos')
			}
			signin({ email, password })
			setEmail('')
			setPassword('')
		} catch (err) {
			toast.error('Erro ao logar')
		}
	}

	return (
		<main className="flex flex-col h-screen justify-center items-center">
			<h1 className="text-4xl font-semibold mb-6">
				<Link to="/">Taskger</Link>
			</h1>
			<form
				className="flex flex-col w-[500px] mb-8 p-8 shadow-lg space-y-4"
				onSubmit={handleSignin}
			>
				<h2>Fazer login</h2>
				<InputForm
					type="email"
					name="Email"
					value={email}
					placeholder="Digite o seu email"
					onChange={(event) => setEmail(event)}
				/>
				<InputForm
					type="password"
					name="Senha"
					value={password}
					placeholder="Digite a sua senha"
					onChange={(event) => setPassword(event)}
				/>
				<ButtonSuccess type="submit" value="Entrar">
					Entrar
				</ButtonSuccess>
				<p>
					Não possui uma conta?
					<Link to="/signup">
						<b className="text-green-400 ml-1">Criar conta</b>
					</Link>
				</p>
			</form>
		</main>
	)
}
