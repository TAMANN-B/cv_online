document.addEventListener('DOMContentLoaded', () => {
	if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		const bubbleField = document.createElement('div');
		bubbleField.className = 'bubble-field';
		bubbleField.setAttribute('aria-hidden', 'true');

		for (let index = 0; index < 18; index += 1) {
			const bubble = document.createElement('span');
			bubble.className = 'bubble';
			bubble.style.setProperty('--bubble-size', `${Math.round(10 + Math.random() * 34)}px`);
			bubble.style.setProperty('--bubble-duration', `${Math.round(14 + Math.random() * 16)}s`);
			bubble.style.setProperty('--bubble-delay', `${Math.round(Math.random() * -28)}s`);
			bubble.style.setProperty('--bubble-height', `${25 + Math.random() * 70}%`);
			bubble.style.setProperty('--bubble-opacity', `${0.2 + Math.random() * 0.45}`);
			bubbleField.appendChild(bubble);
		}

		document.body.prepend(bubbleField);
	}

	const skillModal = document.createElement('div');
	skillModal.className = 'skill-modal';
	skillModal.setAttribute('aria-hidden', 'true');
	skillModal.innerHTML = `
		<div class="skill-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="skill-modal-title">
			<button class="skill-modal-close" type="button" aria-label="Fermer"><i class="fas fa-xmark"></i></button>
			<span class="section-kicker"><i class="fas fa-sparkles"></i> Détail de la compétence</span>
			<h2 id="skill-modal-title"></h2>
			<p class="skill-modal-description"></p>
			<div class="skill-modal-tags"></div>
		</div>
	`;
	document.body.appendChild(skillModal);

	const closeSkillModal = () => {
		skillModal.classList.remove('is-visible');
		skillModal.setAttribute('aria-hidden', 'true');
	};

	document.querySelectorAll('.skill-card-action').forEach((action) => {
		action.addEventListener('click', () => {
			const card = action.closest('.skill-card');
			skillModal.querySelector('h2').textContent = card.querySelector('h3').textContent;
			skillModal.querySelector('.skill-modal-description').textContent = card.querySelector('.skill-card p').textContent;
			skillModal.querySelector('.skill-modal-tags').innerHTML = card.querySelector('.skill-tags').innerHTML;
			skillModal.classList.add('is-visible');
			skillModal.setAttribute('aria-hidden', 'false');
			skillModal.querySelector('.skill-modal-close').focus();
		});
	});

	skillModal.querySelector('.skill-modal-close').addEventListener('click', closeSkillModal);
	skillModal.addEventListener('click', (event) => {
		if (event.target === skillModal) {
			closeSkillModal();
		}
	});
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			closeSkillModal();
		}
	});
});
