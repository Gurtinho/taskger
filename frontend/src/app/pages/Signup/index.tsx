import { FormEvent, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ButtonSuccess } from '../../shared/components/ui/Buttons/ButtonSuccess'
import { AuthContext } from '../../shared/contexts/AuthContext'
import toast from 'react-hot-toast'
import { InputForm } from '../../shared/components/ui/InputForm'

export const Signup = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { signup } = useContext(AuthContext)

	const handleSignup = async (event: FormEvent) => {
		event.preventDefault()
		try {
			if (name === '' || email === '' || password === '') {
				return toast.error('Preencha todos os campos')
			}
			signup({ name, email, password })
			setName('')
			setEmail('')
			setPassword('')
		} catch (err) {
			toast.error('Erro ao cadastrar')
		}
	}

	return (
		<main className="flex flex-col h-screen justify-center items-center">
			<h1 className="text-4xl font-semibold mb-6">
				<Link to="/">Taskger</Link>
			</h1>
			<form
				className="flex flex-col w-[500px] mb-8 p-8 shadow-lg space-y-4"
				onSubmit={handleSignup}
			>
				<h2>Criar conta de usuário</h2>
				<InputForm
					type="text"
					name="Nome"
					value={name}
					placeholder="Digite o seu nome"
					onChange={(event) => setEmail(event)}
				/>
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
				<ButtonSuccess type="submit" value="criar conta">
					Criar conta
				</ButtonSuccess>
				<p>
					Já possui uma conta?
					<Link to="/signin">
						<b className="text-green-400 ml-1">Fazer login</b>
					</Link>
				</p>
			</form>
		</main>
	)
}
